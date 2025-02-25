import { Button, FormControl, IconButton, Select, styled, Tabs, TextField } from "@mui/material";

export const StyledSmallTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		borderColor: 'white',
		'& fieldset': {
			borderColor: 'white',
		},
		'&:hover fieldset': {
			borderColor: 'white',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'white',
		},
	},
	'& .MuiInputBase-input': {
		color: 'white',
		padding: '6px 8px',
	},
});

export const StyledTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		borderColor: 'white',
		'& fieldset': {
			borderColor: 'white',
		},
		'&:hover fieldset': {
			borderColor: 'white',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'white',
		},
	},
	'& .MuiInputBase-input': {
		color: 'white',
	},
	'& .MuiInputLabel-root': {
		color: 'white',
		'&.Mui-focused': {
			color: 'white',
		},
	},
});

export const StyledTabs = styled(Tabs)({
	'& .MuiButtonBase-root': {
		textTransform: 'none',
		color: 'white',
		'&.Mui-selected': {
			color: 'white'
		}
	},
	'& .MuiTabs-indicator': {
		backgroundColor: 'white',
	}
})

export const StyledButton = styled(Button)({
 '&.MuiButton-root': {
	 color: 'white',
	 borderColor: 'white',
	 borderWidth: '1px',
	 borderStyle: 'solid',
	 textTransform: 'none',
 }
})

export const StyledIconButton = styled(IconButton)({
	'&.MuiIconButton-root': {
		color: 'white',
	}
})

export const StyledSelect = styled(Select)({
	'& .MuiSelect-root': {
		color: 'white',
	},
	'& .MuiSelect-icon': {
		color: 'white',
	}
})

export const StyledFormControl = styled(FormControl)({
	'& .MuiInputLabel-root': {
		color: 'white',
		'&.Mui-focused': {
			color: 'white',
		},
	},
	'& .MuiInputBase-root': {
		color: 'white',
		'& div': {
			padding: '8px 12px',
			fontSize: '14px',
		},
		'& fieldset': {
			borderColor: 'white',
		},
		'&:hover fieldset': {
			borderColor: 'white',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'white',
		},
	},
});