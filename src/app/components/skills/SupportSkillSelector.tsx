import { SupportSkills } from "@/src/data/skill";

interface SupportSkillSelectorProps {
  selectedSkill?: string;
  excludedSkills: string[];
  onChange: (skillName: string | undefined) => void;
}

export const SupportSkillSelector: React.FC<SupportSkillSelectorProps> = ({
  selectedSkill,
  excludedSkills,
  onChange,
}) => {
  const availableSkills = SupportSkills.filter(
    (skill) =>
      skill.name === selectedSkill || !excludedSkills.includes(skill.name),
  );

  const isEmpty = selectedSkill === undefined;

  return (
    <select
      className={`w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 ${
        isEmpty ? "text-zinc-500" : "text-zinc-50"
      }`}
      value={selectedSkill ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
    >
      <option value="" className="text-zinc-500">
        &lt;Empty slot&gt;
      </option>
      {availableSkills.map((skill) => (
        <option key={skill.name} value={skill.name}>
          {skill.name}
        </option>
      ))}
    </select>
  );
};
