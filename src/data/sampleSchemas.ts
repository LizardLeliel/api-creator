
import { Schema, FieldType } from '../models/schemas';

export let USER_SCHEMA: Schema = new Schema('User', 'A registered account');
export let POST_SCHEMA: Schema = new Schema('Post');

USER_SCHEMA.addSimpleField('name', FieldType.string, 'The user\'s display name');
USER_SCHEMA.addSimpleField('verified', FieldType.boolean, 'If user has been email-verified');
USER_SCHEMA.addSimpleField('email', FieldType.string, 'The user\'s email', false);
USER_SCHEMA.addSimpleField('created', FieldType.string, 'Account\'s creation day', false);
USER_SCHEMA.addSimpleField('follows', FieldType.number, 'account\'s total amount');


POST_SCHEMA.addSimpleField('title', FieldType.string, 'The post\'s title');
POST_SCHEMA.addSimpleField('content', FieldType.string, 'The content of the title');
POST_SCHEMA.addSimpleField('likes', FieldType.number, 'Amount of likes the post has');
POST_SCHEMA.addSimpleField('category', FieldType.number, 'Which self-described category the post belongs to', false);