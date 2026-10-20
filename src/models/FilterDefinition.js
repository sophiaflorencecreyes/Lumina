export class FilterOption {
  constructor(label, value) {
    this.label = label;
    this.value = value; 
  }
}

export class FilterDefinition {
  constructor(key, label, options, prefix = '') {
    this.key = key; 
    this.label = label;
    this.options = options;
    this.prefix = prefix; 
  }
}