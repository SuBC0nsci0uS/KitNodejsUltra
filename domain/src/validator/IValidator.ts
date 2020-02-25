export interface IValidator<TInput, TOutput> {
  Validate(data: TInput): TOutput;
}
