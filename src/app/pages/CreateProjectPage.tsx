import { SimpleEditor } from "@/components/editor/test";
import FileUpload from "@/components/FileUpload";

export function ProjectEditor() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-1 flex flex-col order-1 md:order-2  gap-2 items-start">
        <FileUpload />
        <SimpleEditor />
      </div>
    </div>
  );
}
