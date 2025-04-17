import { ImageWithUUID } from "@/schema/image";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImagePlusIcon, X } from "lucide-react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type SortableImageProps = {
  id: string; // 고유 식별자
  file: File;
  onRemove: (id: string) => void;
};

const SortableImage = ({ id, file, onRemove }: SortableImageProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(id);
        }}
        className="absolute right-1 top-1 z-50 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
      >
        <X className="h-4 w-4" />
      </button>

      <img
        {...listeners}
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

interface SortableImagesProps {
  images: ImageWithUUID[];
  setImages: React.Dispatch<React.SetStateAction<ImageWithUUID[]>>;
}
export const SortableImages: React.FC<SortableImagesProps> = ({
  images,
  setImages,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const withIds = fileArray.map((file) => ({
      id: uuidv4(),
      file,
    }));
    setImages((prev) => [...prev, ...withIds]);
  };

  const handleRemove = (id: string) => {
    console.log("remove", id);

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    setImages((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className="w-full overflow-x-hidden">
        <div className="grid grid-cols-3 gap-2 overflow-hidden">
          <div
            onClick={handleClick}
            className="relative flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed hover:bg-muted"
          >
            <ImagePlusIcon className="h-6 w-6 text-muted-foreground" />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <SortableContext
            items={images.map((img) => img.id)}
            strategy={rectSortingStrategy}
          >
            {images.map((img) => (
              <SortableImage
                key={img.id}
                id={img.id}
                file={img.file}
                onRemove={handleRemove}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};
