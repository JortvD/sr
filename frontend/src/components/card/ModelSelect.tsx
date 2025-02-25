import { MenuItem } from '@mui/material';
import { StyledFormControl, StyledSelect } from '../mui';

interface ModelSelectProps {
	model: string;
	setModel: (model: string) => void;
}

export const MODELS = ['gpt-4o-mini', 'gpt-4o', 'o3-mini'];

export function ModelSelect({ model, setModel }: ModelSelectProps) {
	return (
		<StyledFormControl className='w-32'>
			<StyledSelect
				labelId="model-select-label"
				value={model === '' ? MODELS[0] : model}
				onChange={(e) => setModel(e.target.value as string)}
			>
				{MODELS.map((model) => (
					<MenuItem key={model} value={model}>
						{model}
					</MenuItem>
				))}
			</StyledSelect>
		</StyledFormControl>
	);
};