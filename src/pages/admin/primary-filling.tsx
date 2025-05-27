import { Button } from "@/shared/ui/button";
import { DateSelect } from "@/shared/widgets/date-select";
import { TrackSelect } from "@/shared/widgets/track-select";
import { useState } from "react";
import { uploadPrimaryFilling } from "./api/upload-primary-filling";
import { useToast } from "@/shared/hooks/use-toast";
import { read, utils } from "xlsx";
import { Trash } from "lucide-react";
import { useGetAllDates } from "../projects-list-page/api/hooks/use-get-all-dates";

export type PrimaryFillingSheets = {
  summary: File | null;
  annotation: File | null;
  score: File | null;
};
export function PrimaryFilling() {
  const [date, setDate] = useState("");
  const [track, setTrack] = useState("");
  const [files, setFiles] = useState<PrimaryFillingSheets | null>(null);
  const { toast } = useToast();

  const { data: dates } = useGetAllDates();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const file = selected[0];
    const data = await file.arrayBuffer();
    const workbook = read(data, { type: "array" });

    const newFiles: PrimaryFillingSheets = {
      summary: null,
      annotation: null,
      score: null,
    };

    const sheetToKey = {
      "Общие списки": "summary",
      Аннотации: "annotation",
      Баллы: "score",
    } as const;

    type FileKeys = keyof typeof newFiles;

    for (const sheetName of Object.keys(
      sheetToKey
    ) as (keyof typeof sheetToKey)[]) {
      if (workbook.SheetNames.includes(sheetName)) {
        const csvString = utils.sheet_to_csv(workbook.Sheets[sheetName]);
        const blob = new Blob([csvString], { type: "text/csv" });
        const fileFromSheet = new File([blob], `${sheetName}.csv`, {
          type: "text/csv",
        });

        const key = sheetToKey[sheetName];
        newFiles[key as FileKeys] = fileFromSheet;
      }
    }

    setFiles(newFiles);
  };

  const hadnleFileRemove = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFiles(null);
  };
  const handleUpload = async () => {
    try {
      if (!files) return;
      const dateId = dates?.find((_date) => _date.name === date)?.id;
      const trackId = track === "Бакалавриат" ? 0 : 1;
      if (!dateId || !trackId) {
        throw new Error("Что-то пошло не так");
      }
      await uploadPrimaryFilling(dateId, trackId, files);

      toast({
        title: "Проекты успешно загружены",
        description:
          "Вы можете просмотреть их в соответствующем разделе основного приложения.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Не удалось загрузить проекты",
        description:
          error instanceof Error ? error.message : "Что-то пошло не так",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col max-w-7xl w-full gap-4 py-2">
      <h1>Загрузка проектов из файлов</h1>
      <div className="flex gap-2 items-center">
        <div>Выберите дату:</div>
        <DateSelect
          value={date}
          onValueChange={setDate}
          triggerClassName="flex-none max-w-60"
        />
      </div>
      <div className="flex justify-between gap-4 flex-col md:items-center md:flex-row">
        <div className="flex items-center gap-2">
          <div>Выберите трек:</div>
          <TrackSelect
            value={track}
            onValueChange={setTrack}
            triggerClassName="flex-none w-60"
          />
        </div>
        <Button className="w-fit" variant="outline" asChild>
          <a href="/files/rules.pdf" download>
            Скачать правила оформления
          </a>
        </Button>
      </div>
      <label className="flex justify-center relative items-center cursor-pointer h-[50svh] rounded-md bg-accent">
        <input
          hidden
          type="file"
          accept=".xlsx"
          multiple
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-2 text-center flex-col xs:flex-row px-2">
          <span className="flex flex-col">
            {files
              ? "Файлы загружены: " + Object.keys(files).join(", ")
              : "Нажмите сюда чтобы загрузить xlsx файл с проектами"}
          </span>
          {files !== null && (
            <Button onClick={hadnleFileRemove} variant="ghost" size="icon">
              <Trash />
            </Button>
          )}
        </div>
      </label>

      <Button
        disabled={!files || !date || !track}
        className="w-fit"
        onClick={handleUpload}
      >
        Загрузить
      </Button>
    </div>
  );
}
