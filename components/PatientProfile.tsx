import { getPatientProfile, getExerciseHistory } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";

interface PatientProfileProps {
  patientId: string;
  onBack: () => void;
}

export function PatientProfile({ patientId, onBack }: PatientProfileProps) {
  const patient = getPatientProfile(patientId);
  const exercises = getExerciseHistory(patientId);

  if (!patient) return <div className="p-6">Patient not found.</div>;

  return (
    <div className="p-6">
      <button className="mb-4 text-blue-600 underline" onClick={onBack}>
        &larr; Back to List
      </button>
      <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
      <div className="mb-4 text-gray-700">
        <div>MRN: {patient.mrn}</div>
        <div>Date of Birth: {patient.dob}</div>
        <div>Gender: {patient.gender}</div>
        <div>Diagnosis: {patient.diagnosis}</div>
        <div>Date of Stroke Onset: {patient.strokeOnset}</div>
        <div>Status: {patient.status}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Exercise History</h3>
      {exercises.length === 0 ? (
        <div>No exercise history found.</div>
      ) : (
        <div className="space-y-4">
          {exercises.map((ex) => (
            <div key={ex.id} className="border rounded p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{ex.taskName}</span>
                <span
                  className={
                    ex.status === "active" ? "text-green-600" : "text-gray-400"
                  }
                >
                  {ex.status}
                </span>
              </div>
              <div>Frequency: {ex.frequency}</div>
              <div className="flex items-center space-x-2">
                <span>Progress:</span>
                <Progress value={ex.progress} className="w-32 h-2" />
                <span>{ex.progress}%</span>
              </div>
              <div>
                Last Attempt: {new Date(ex.lastAttempt).toLocaleString()}
              </div>
              <div>Average Time to Complete: {ex.averageTime} seconds</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
