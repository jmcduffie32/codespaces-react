import { useEffect, useState } from "react";
import _ from "lodash";
import { supabase } from "../supabase";
import CourseList from './CourseList';

function RoundList({
  onRoundSelected,
  currentCourseId,
}: {
  onRoundSelected: (roundCode: string) => void;
  currentCourseId: number;
}) {
  const [courseId, setCourseId] = useState<number>(currentCourseId);
  const [rounds, setRounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRounds() {
      const res = await supabase
        .from("round")
        .select("*")
        .limit(10)
        .eq("course_id", courseId)
        .order("id", { ascending: false });
      const data = res.data;
      if (!data) {
        setRounds([]);
        setLoading(false);
        return;
      }
      const parsedRounds = data.map((round) => {
        return { ...round, data: JSON.parse(round.data) };
      });
      setRounds(parsedRounds || []);
      setLoading(false);
    }

    fetchRounds();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CourseList
        onCourseIdSelected={(id: number) => {
          setCourseId(id);
        }}
        currentCourseId={1}
      />
      <div className="grid grid-cols-1 gap-4">
        {rounds.map((round: any) => (
          <div
            key={round.id}
            className="bg-white p-4 rounded shadow cursor-pointer text-left"
            onClick={() => {
              onRoundSelected(round.code);
            }}
          >
            <h3 className="text-xl font-bold">{round.name || round.code}</h3>
            <p className="text-gray-500">{round.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default RoundList;
