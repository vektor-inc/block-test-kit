import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function AlertEdit({ attributes, setAttributes }) {

	const { style, content } = attributes;

	const blockProps = useBlockProps( {
		className: `alert alert-${style}`,
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Style Settings', 'block-test-kit')}>
					<SelectControl
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						options={[
							{ label: __('Info', 'block-test-kit'), value: 'info' },
							{
								label: __('Danger', 'block-test-kit'),
								value: 'danger',
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="p"
					onChange={ (value) => setAttributes({ content: value }) }
					value={content}
				/>
			</div>
		</Fragment>
	);
}
