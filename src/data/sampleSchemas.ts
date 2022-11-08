
import { Schema, FieldType } from '../models/schemas';

export let USER_SCHEMA: Schema = new Schema("User");
export let POST_SCHEMA: Schema = new Schema("Post");

USER_SCHEMA.addSimpleField('name', FieldType.string, true);
USER_SCHEMA.addSimpleField('email', FieldType.string);
USER_SCHEMA.addSimpleField('verified', FieldType.boolean);
USER_SCHEMA.addSimpleField('name', FieldType.string);


POST_SCHEMA.addSimpleField('title', FieldType.string, true);
POST_SCHEMA.addSimpleField('content', FieldType.string, true);
POST_SCHEMA.addSimpleField('likes', FieldType.number);
// POST_SCHEMA.addSimpleField('title', FieldType.string);
// POST_SCHEMA.addSimpleField('title', FieldType.string);
// POST_SCHEMA.addSimpleField('title', FieldType.string);