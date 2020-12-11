import { RichText, useBlockProps } from '@wordpress/block-editor';

const blockAttributes = {
	attributes: {
		style: {
			type: 'string',
			default: 'info',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save({ attributes }) {

			const { style, content } = attributes;
			return (
				<div { ...useBlockProps.save( { className: `alert alert-${style}`} ) }>
					<RichText.Content tagName={'p'} value={content} />
				</div>
			);
		}
	},
];
export default deprecated;
