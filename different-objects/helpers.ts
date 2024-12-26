import * as handlebars from "handlebars";

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function deepMerge(target: any, ...sources: any[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

handlebars.registerHelper("deepMerge", function (...args) {
  // Remove the last argument (Handlebars options object)
  const options = args.pop();

  // Get all values from varsObject to build the regex pattern
  const getVarsValues = (obj: any): string[] => {
    if (typeof obj !== "object" || !obj) return [];
    return Object.values(obj).reduce((acc: string[], val) => {
      if (typeof val === "object") {
        return [...acc, ...getVarsValues(val)];
      }
      if (typeof val === "string") {
        return [...acc, val];
      }
      return acc;
    }, []);
  };

  // Parse JSON strings and merge objects
  const objects = args.map((arg, index) => {
    if (typeof arg === "string") {
      try {
        // For vars helper output (contains unquoted values)
        if (arg.includes('": ') && !arg.includes(': "')) {
          const validJson = arg.replace(/:\s*(\w+)/g, ':"$1"');
          const parsed = JSON.parse(validJson);
          return parsed;
        }
        return JSON.parse(arg);
      } catch (e) {
        return arg;
      }
    }
    return arg;
  });

  // Merge all objects
  const result = deepMerge({}, ...objects);

  // Get all values from varsObject (last argument)
  const varsValues = getVarsValues(objects[objects.length - 1]);
  const varsPattern = varsValues
    .map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  // Convert result to string, ensuring values from varsObject remain unquoted
  const stringifyWithUnquotedVars = (obj: any): string => {
    return JSON.stringify(obj, null, 2).replace(
      new RegExp(`"(${varsPattern})"`, "g"),
      "$1"
    );
  };

  return stringifyWithUnquotedVars(result);
});

handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

handlebars.registerHelper("vars", function (context) {
  if (!context || typeof context !== "object") {
    return "";
  }

  const processValue = (value: any): any => {
    if (typeof value === "object" && value !== null) {
      const result: Record<string, any> = {};
      Object.entries(value).forEach(([k, v]) => {
        result[k] = processValue(v);
      });
      return (
        "{" +
        Object.entries(result)
          .map(([k, v]) => `"${k}": ${v}`)
          .join(", ") +
        "}"
      );
    }
    // Return string values without quotes
    return typeof value === "string" ? value : JSON.stringify(value);
  };

  return processValue(context);
});
