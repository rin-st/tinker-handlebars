import * as handlebars from "handlebars";

// Register your helpers
handlebars.registerHelper("uppercase", function (str: string) {
  return str.toUpperCase();
});

// You can add more helpers here
handlebars.registerHelper("lowercase", function (str: string) {
  return str.toLowerCase();
});
