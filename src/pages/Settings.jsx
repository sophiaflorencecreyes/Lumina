import ToggleSwitch from '../components/ToggleSwitch';
import { useApp } from '../context/AppContext';
import { SETTING_DEFINITIONS } from '../data/settings';
import { STRINGS } from '../constants/strings';

export default function Settings() {
  const { settings, updateSetting } = useApp();

  return (
    <div className="px-4 pb-16 pt-28 sm:px-8 lg:px-14">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div>
          <h1 className="text-5xl font-extrabold sm:text-6xl">{STRINGS.settings.heading}</h1>
          <p className="mt-4 text-sm font-bold text-muted sm:text-base">{STRINGS.settings.note}</p>
        </div>

        <div className="max-w-3xl space-y-2 rounded-3xl bg-teal-pill p-3">
          {SETTING_DEFINITIONS.map((def) => (
            <div
              key={def.key}
              className="flex items-center justify-between gap-4 rounded-2xl bg-surface-alt p-4 sm:px-5"
            >
              <div>
                <h2 className="text-lg font-bold sm:text-xl">{def.label}</h2>
                <p className="text-sm font-bold text-muted sm:text-base">{def.description}</p>
              </div>

              {def.controlType === 'toggle' ? (
                <ToggleSwitch
                  checked={settings[def.key]}
                  onChange={(value) => updateSetting(def.key, value)}
                  label={def.label}
                />
              ) : (
                <select
                  value={settings[def.key]}
                  onChange={(e) => updateSetting(def.key, e.target.value)}
                  aria-label={def.label}
                  className="shrink-0 rounded-full bg-white px-4 py-1.5 font-bold text-bg"
                >
                  {def.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}