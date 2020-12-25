import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { style, content } = attributes;

	return (
		<div { ...useBlockProps.save( { className: `alert alert-${style}`} ) }>
			<RichText.Content tagName={'div'} value={content} />
		</div>
	);
}
