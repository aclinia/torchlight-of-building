/**
 * Basic type registry for template capture types.
 * Maps type specifiers to their TypeScript types.
 */
interface BasicCaptureTypeRegistry {
  int: number;
  dec: number;
  "int%": number;
  "dec%": number;
}

/**
 * Look up the TypeScript type for a capture type specifier.
 * Falls back to `string` for unknown types.
 */
type LookupCaptureType<T extends string> =
  T extends keyof BasicCaptureTypeRegistry
    ? BasicCaptureTypeRegistry[T]
    : string;

/**
 * Parse content inside brackets to determine capture type.
 * - `{name:type}` -> `{ name?: Type }`
 * - `keyword` -> `{ keyword?: true }`
 */
type ParseOptionalContent<S extends string> =
  S extends `{${infer Name}:${infer Type}}`
    ? { [K in Name]?: LookupCaptureType<Type> }
    : S extends ""
      ? NonNullable<unknown>
      : { [K in S]?: true };

/**
 * Extract all required captures from template.
 * Required captures are `{name:type}` NOT inside brackets.
 */
type ExtractRequiredCaptures<
  T extends string,
  Acc extends object = NonNullable<unknown>,
> = T extends `${infer _Before}[${infer _Content}]${infer Rest}`
  ? ExtractRequiredCaptures<`${_Before}${Rest}`, Acc>
  : T extends `${infer _Before}{${infer Name}:${infer Type}}${infer Rest}`
    ? ExtractRequiredCaptures<
        Rest,
        Acc & { [K in Name]: LookupCaptureType<Type> }
      >
    : Acc;

/**
 * Extract all optional captures from template.
 * Finds all `[content]` patterns and parses their content.
 */
type ExtractOptionalCaptures<
  T extends string,
  Acc extends object = NonNullable<unknown>,
> = T extends `${infer _Before}[${infer Content}]${infer Rest}`
  ? ExtractOptionalCaptures<Rest, Acc & ParseOptionalContent<Content>>
  : Acc;

/**
 * Parse a template string and extract the captures type.
 * Combines required captures with optional captures.
 *
 * Examples:
 * - `{value:int}` -> `{ value: number }`
 * - `{value:dec%} [additional]` -> `{ value: number; additional?: true }`
 * - `{min:int} - {max:int}` -> `{ min: number; max: number }`
 */
export type ParseTemplate<T extends string> = ExtractRequiredCaptures<T> &
  ExtractOptionalCaptures<T>;
