import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function CourseList({
  onCourseIdSelected,
  currentCourseId,
  label="Course Filter"
}: {
  onCourseIdSelected: (courseId: number) => void;
  currentCourseId: number;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState<number>(currentCourseId);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetchCourses();
  }, [])

  const fetchCourses = async () => {
    const res = await supabase
      .from("course")
      .select("*");
    const data = res.data;

    setCourses(data || []);
    setLoading(false);
  }

  return (
    <div className="mb-4 grid grid-cols-1 gap-4">
      <label>
        {label}
        <select
          className="border border-gray-300 rounded px-2 py-1 ml-2"
          value={courseId}
          onChange={(e) => {
            setCourseId(parseInt(e.target.value));
            onCourseIdSelected(parseInt(e.target.value));
          }}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default CourseList;
