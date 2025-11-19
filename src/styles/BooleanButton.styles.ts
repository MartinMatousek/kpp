import { Switch, styled } from "@mui/material";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : '#ffffff',
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.text.secondary,
  },
  "& .MuiSwitch-thumb": {
    border: `1px solid ${theme.palette.divider}`,
    width: 20,
    height: 20,
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[300],
    border: `1px solid ${theme.palette.divider}`,
  },
}));