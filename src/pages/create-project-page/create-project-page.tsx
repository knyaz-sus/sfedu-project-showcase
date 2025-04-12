import FileUpload from "@/pages/create-project-page/components/file-upload";
import { RichTextEditor } from "./components/rich-editor";

export function CreateProjectPage() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-1 flex flex-col order-1 md:order-2  gap-2 items-start">
        <FileUpload />
        <RichTextEditor />
      </div>
    </div>
  );
}
