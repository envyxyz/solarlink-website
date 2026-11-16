// Local design-system rules (DESIGN.md hard rules 1 and 2). No dependency: plain ESLint rule objects.
const HEX = /(^|[^\w&])#[0-9a-fA-F]{3,8}\b/;
// w-[10px], bg-[#fff], data-[state=open]:x, [&>svg]:size-4, [mask-type:alpha]
const ARBITRARY = /(^|\s)(?:[\w!:-]*-\[|\[|[\w-]+:\[)[^\]\s]+\]/;
const COPY_ATTRS = new Set(["alt", "title", "placeholder", "aria-label", "aria-description", "aria-roledescription", "aria-valuetext", "label"]);

const strings = (context, test, message) => {
  const check = (node, text) => test(text) && context.report({ node, message });
  return {
    Literal: (n) => typeof n.value === "string" && check(n, n.value),
    TemplateElement: (n) => check(n, n.value.raw),
  };
};

/** True when the node sits in a JSX child expression, not inside an attribute, call or function. */
const isChildExpr = (node) => {
  for (let p = node.parent; p; p = p.parent) {
    if (["JSXAttribute", "CallExpression", "ArrowFunctionExpression", "FunctionExpression", "Property", "BinaryExpression"].includes(p.type)) return false;
    if (p.type === "JSXExpressionContainer") return p.parent.type === "JSXElement" || p.parent.type === "JSXFragment";
  }
  return false;
};

const rule = (create, description) => ({ meta: { type: "problem", schema: [], docs: { description } }, create });

const plugin = {
  rules: {
    "no-raw-hex": rule(
      (ctx) => strings(ctx, (s) => HEX.test(s), "No raw hex colour. Use a token utility (bg-ink, text-ink-2...). New colour? Add it to DESIGN.md first."),
      "Block raw hex colours",
    ),
    "no-arbitrary-tailwind": rule(
      (ctx) => strings(ctx, (s) => ARBITRARY.test(s), "No arbitrary Tailwind values. Use a token utility, or add the token to DESIGN.md first."),
      "Block arbitrary Tailwind values",
    ),
    "no-literal-copy": rule((ctx) => {
      const msg = "No literal copy in components. Put it in src/content.ts and render it.";
      const hasText = (s) => /\S/.test(s);
      return {
        JSXText: (n) => hasText(n.value) && ctx.report({ node: n, message: msg }),
        // {"text"}, {cond ? "text" : "text"}, {`text ${x}`} used as children
        "JSXElement > JSXExpressionContainer > Literal": (n) => typeof n.value === "string" && hasText(n.value) && ctx.report({ node: n, message: msg }),
        // literal as a branch value: {cond ? "text" : x}, {cond && "text"} (never the test, a comparison or a call argument)
        "ConditionalExpression > Literal": (n) => n.parent.test !== n && isChildExpr(n) && typeof n.value === "string" && /[A-Za-z]/.test(n.value) && ctx.report({ node: n, message: msg }),
        "LogicalExpression > Literal": (n) => n.parent.right === n && isChildExpr(n) && typeof n.value === "string" && /[A-Za-z]/.test(n.value) && ctx.report({ node: n, message: msg }),
        "JSXElement > JSXExpressionContainer > TemplateLiteral": (n) => ctx.report({ node: n, message: msg }),
        // alt="..", aria-label="..", title=".." (aria state values and data-testid stay allowed)
        JSXAttribute: (n) => {
          if (!COPY_ATTRS.has(n.name.name)) return;
          const v = n.value;
          const lit = v?.type === "Literal" ? v : v?.type === "JSXExpressionContainer" && v.expression.type === "Literal" ? v.expression : null;
          if (lit && typeof lit.value === "string" && hasText(lit.value)) ctx.report({ node: lit, message: msg });
        },
      };
    }, "Block literal copy in components"),
  },
};

export default plugin;
