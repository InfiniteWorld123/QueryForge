import type * as v from "valibot";
import type { CreateLabelSchema, UpdateLabelSchema } from "./labels.validation";

export type CreateLabelBodyType = v.InferInput<typeof CreateLabelSchema>;
export type UpdateLabelBodyType = v.InferInput<typeof UpdateLabelSchema>;

export type LabelParamsType = {
	labelId: string;
};
