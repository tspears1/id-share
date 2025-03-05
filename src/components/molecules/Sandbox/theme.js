const theme = {
   "colors": {
      "surface1": "hsl(var(--color-surface-1))",
      "surface2": "hsl(var(--color-surface-2))",
      "surface3": "hsl(var(--color-surface-3))",
      "clickable": "hsl(var(--color-text-2))",
      "base": "hsl(var(--color-text-0))",
      "disabled": "hsl(var(--color-text-3))",
      "hover": "hsl(var(--color-text-1))",
      "accent": "hsl(var(--color-accent))",
      "error": "hsl(var(--color-destructive-foreground))",
      "errorSurface": "hsl(var(--color-surface-0))"
   },
   "syntax": {
      "plain": "hsl(var(--color-syntax-plain))",
      "comment": {
         "color": "hsl(var(--color-syntax-comment))",
         "fontStyle": "italic"
      },
      "keyword": {
         color: "hsl(var(--color-syntax-keyword))",
      },
      "tag": {
         color: "hsl(var(--color-syntax-tag))",
      },
      "punctuation": {
         color: "hsl(var(--color-syntax-punctuation))",
      },
      "definition": {
         color: "hsl(var(--color-syntax-definition))",
         fontWeight: 'bold',
      },
      "property": {
         color: "hsl(var(--color-syntax-property))",
         fontStyle: 'italic',
         fontWeight: 'bold',
      },
      "static": {
         color: "hsl(var(--color-syntax-static))",
         fontStyle: 'normal'
      },
      "string": {
         color: "hsl(var(--color-syntax-string))",
      }
   },
   "font": {
      "body": "var(--font-sans)",
      "mono": "var(--font-mono)",
      "size": "var(--font-size-md)",
      "lineHeight": "var(--leading-normal)"
   }
}

export default theme

// interface SandpackSyntaxStyle {
//    color?: string;
//    fontStyle?: "normal" | "italic";
//    fontWeight?:
//      | "normal"
//      | "bold"
//      | "100"
//      | "200"
//      | "300"
//      | "400"
//      | "500"
//      | "600"
//      | "700"
//      | "800"
//      | "900";
//    textDecoration?:
//      | "none"
//      | "underline"
//      | "line-through"
//      | "underline line-through";
//  }

//  export interface SandpackTheme {
//    colors: {
//      // Surface
//      surface1: string;
//      surface2: string;
//      surface3: string;
//      // UI
//      disabled: string;
//      base: string;
//      clickable: string;
//      hover: string;
//      // Brand
//      accent: string;
//      // Feedbacks
//      error?: string;
//      errorSurface?: string;
//      warning?: string;
//      warningSurface?: string;
//    };
//    syntax: {
//      plain: string | SandpackSyntaxStyle;
//      comment: string | SandpackSyntaxStyle;
//      keyword: string | SandpackSyntaxStyle;
//      definition: string | SandpackSyntaxStyle;
//      punctuation: string | SandpackSyntaxStyle;
//      property: string | SandpackSyntaxStyle;
//      tag: string | SandpackSyntaxStyle;
//      static: string | SandpackSyntaxStyle;
//      string?: string | SandpackSyntaxStyle; // use static as fallback
//    };
//    font: {
//      body: string;
//      mono: string;
//      size: string;
//      lineHeight: string;
//    };
//  }