import { Button } from "@/shared/ui/button";
import { DateSelect } from "@/shared/widgets/date-select";
import { TrackSelect } from "@/shared/widgets/track-select";
import { useState } from "react";
import { loadPrimaryFilling } from "./api/load-primary-filling";

export function PrimaryFilling() {
  const [date, setDate] = useState("");
  const [track, setTrack] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      const fileArray = Array.from(selected);
      setFiles((prev) => (prev ? [...prev, ...fileArray] : fileArray));
    }
  };
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev?.filter((_, idx) => idx !== indexToRemove) ?? null);
  };
  const handleUpload = async () => {
    if (!files) return;
    await loadPrimaryFilling(date, track, files);
  };
  return (
    <div className="flex flex-col max-w-7xl w-full gap-4 p-4">
      <h1>Загрузка проектов из файлов</h1>

      <div className="flex gap-2 items-center">
        <div>Выберите дату:</div>
        <DateSelect
          value={date}
          onValueChange={setDate}
          triggerClassName="max-w-60"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>Выберите трек:</div>
          <TrackSelect
            value={track}
            onValueChange={setTrack}
            triggerClassName="w-60"
          />
        </div>
        <Button className="w-fit" variant="outline" asChild>
          <a href="/files/rules.pdf" download>
            Скачать правила оформления
          </a>
        </Button>
      </div>
      <label className="flex justify-center relative items-center h-[50svh] rounded-md bg-accent">
        <input
          hidden
          type="file"
          accept=".csv, .xlsx"
          multiple
          onChange={handleFileChange}
        />
        <ol className="flex flex-col ">
          Нажмите сюда чтобы загрузить:
          <li>1. Общие списки.</li>
          <li>2. Аннотации.</li>
          <li className="mb-6">3. Баллы.</li>
          {files?.length ? (
            <div className="flex flex-col text-sm text-muted-foreground absolute bottom-4 left-4">
              <div>Загруженные файлы:</div>
              <ul className="flex gap-4 flex-wrap">
                {files.map((file, idx) => (
                  <li
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFile(idx);
                    }}
                    className="cursor-pointer underline hover:text-destructive transition"
                    title="Нажмите, чтобы удалить"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </ol>
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
