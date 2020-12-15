/**
 * Alert block type
 *
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated'

import './style.scss';

import { __ } from '@wordpress/i18n';
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Alert', 'block-test-kit'),
	icon: 'smiley',
	save,
	edit,
	// deprecated,
};

export const registerMyBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { metadata, settings, name } = block;
	if ( metadata ) {
		unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );
	}
	registerBlockType( name, settings );
};

//ブロックを登録
registerMyBlock({ metadata, settings, name });
