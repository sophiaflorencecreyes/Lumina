export class SettingDefinition {
  constructor({ key, label, description, controlType, options = [] }) {
    this.key = key;
    this.label = label;
    this.description = description;
    this.controlType = controlType;
    this.options = options;
  }
}