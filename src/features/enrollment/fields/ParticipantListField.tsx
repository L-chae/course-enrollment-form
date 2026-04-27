import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EnrollmentForm } from "../types/enrollment.types";
import { TextField } from "./TextField";

interface ParticipantListFieldProps {
  count: number;
  register: UseFormRegister<EnrollmentForm>;
  errors: FieldErrors<EnrollmentForm>;
}

export function ParticipantListField({
  count,
  register,
  errors,
}: ParticipantListFieldProps) {
  const participantErrors =
    "group" in errors ? errors.group?.participants : undefined;

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">참가자 명단</h4>
        <p className="mt-1 text-sm text-gray-500">
          신청 인원수에 맞춰 참가자 이름과 이메일을 입력해 주세요.
        </p>
      </div>

      {Array.from({ length: count }).map((_, index) => {
        const rowError = Array.isArray(participantErrors)
          ? participantErrors[index]
          : undefined;

        return (
          <div key={index} className="grid gap-3 rounded-md border p-4 md:grid-cols-2">
            <TextField
              label={`참가자 ${index + 1} 이름`}
              required
              {...register(`group.participants.${index}.name` as const, {
                required: "참가자 이름을 입력해 주세요.",
              })}
              error={rowError?.name?.message?.toString()}
            />

            <TextField
              label={`참가자 ${index + 1} 이메일`}
              type="email"
              required
              {...register(`group.participants.${index}.email` as const, {
                required: "참가자 이메일을 입력해 주세요.",
              })}
              error={rowError?.email?.message?.toString()}
            />
          </div>
        );
      })}
    </div>
  );
}
