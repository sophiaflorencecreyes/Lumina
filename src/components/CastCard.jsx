import SafeImage from './SafeImage';
import { STRINGS } from '../constants/strings';

export default function CastCard({ member }) {
  return (
    <figure className="w-28 shrink-0 sm:w-32">
      <SafeImage
        src={member.photoUrl}
        alt={member.name}
        initials
        className="aspect-[3/4] w-full rounded-md object-cover"
      />
      <figcaption className="mt-2 text-xs font-bold leading-snug sm:text-sm">
        {STRINGS.roleLabel(member.name, member.getRoleLabel())}
      </figcaption>
    </figure>
  );
}