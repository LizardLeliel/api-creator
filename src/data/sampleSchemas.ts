
import { Schema, FieldType } from '../models/schemas';

let veryLongFieldDescription = "this is a verified account, which means that "
veryLongFieldDescription = veryLongFieldDescription + veryLongFieldDescription + veryLongFieldDescription;
veryLongFieldDescription = veryLongFieldDescription + veryLongFieldDescription;
veryLongFieldDescription = veryLongFieldDescription + veryLongFieldDescription;
veryLongFieldDescription = veryLongFieldDescription + veryLongFieldDescription;
veryLongFieldDescription = "This is a verified account, which means that " + veryLongFieldDescription; // Gotta respect capitalization

let USER_SCHEMA: Schema = new Schema('User', 'A registered account');
let POST_SCHEMA: Schema = new Schema('Post');
let CATEGORY_SCHEMA: Schema = new Schema('Category', 'A category to find posts');
let SOCIAL_ACHIEVEMENTS_SCHEMA: Schema = new Schema('Achievmement', 'Various rewards a user can earn by interacting on our platform');


USER_SCHEMA.addSimpleField('name', FieldType.string, 'The user\'s display name');
// USER_SCHEMA.addSimpleField('verified', FieldType.boolean, 'If user has been email-verified');
USER_SCHEMA.addSimpleField('verified', FieldType.boolean, veryLongFieldDescription);
USER_SCHEMA.addSimpleField('email', FieldType.email, '', false);
USER_SCHEMA.addSimpleField('created', FieldType.string, 'Account\'s creation day', false);
USER_SCHEMA.addSimpleField('follows', FieldType.number, 'account\'s total amount');


POST_SCHEMA.addSimpleField('title', FieldType.string, 'The post\'s title');
POST_SCHEMA.addSimpleField('content', FieldType.string, 'The content of the title');
POST_SCHEMA.addSimpleField('likes', FieldType.number, 'Amount of likes the post has');
POST_SCHEMA.addSimpleField('category', FieldType.number, 'Which self-described category the post belongs to', false);


CATEGORY_SCHEMA.addSimpleField('Name', FieldType.string, 'What the category represents');
CATEGORY_SCHEMA.addSimpleField('Description', FieldType.string, 'Description of category name', false);

SOCIAL_ACHIEVEMENTS_SCHEMA.addSimpleField('Name', FieldType.string, 'Name of Achievement');
SOCIAL_ACHIEVEMENTS_SCHEMA.addSimpleField('Point Value', FieldType.number, 'Name of Achievement');
SOCIAL_ACHIEVEMENTS_SCHEMA.addSimpleField('Hidden', FieldType.boolean, 'Whether requirements are unknown until unlocked');
SOCIAL_ACHIEVEMENTS_SCHEMA.addSimpleField('Special Colour', FieldType.string, 'Alternate colour for special achievements', false);



export let SAMPLE_SCHEMAS = [USER_SCHEMA, POST_SCHEMA, CATEGORY_SCHEMA, SOCIAL_ACHIEVEMENTS_SCHEMA];