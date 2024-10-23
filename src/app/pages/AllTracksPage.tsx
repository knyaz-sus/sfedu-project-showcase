import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTracks } from "../../api/fetchTracks";

export function AllTracksPage() {
  const navigate = useNavigate();

  const [tracksData, setTracksData] = useState<any>();

  useEffect(() => {
    fetchTracks().then((newTracksData: any) => {
      setTracksData(newTracksData);
    });
  }, []);

  if (!tracksData) return <></>;

  return (
    <div
      style={{
        maxWidth: "var(--bs-breakpoint-lg)",
        alignSelf: "center",
      }}
      className="d-flex flex-column gap-3 py-3"
    >
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">Все треки</h2>
      </div>
      {tracksData.map((track: any) => {
        return (
          <div
            key={track.id}
            onClick={() => {
              navigate(`/tracks/${track.id}`);
            }}
            className="hover-bg-primary-25 cursor-pointer border border-primary p-3 rounded"
          >
            {track.name}
          </div>
        );
      })}
    </div>
  );
}
