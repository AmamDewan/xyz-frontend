import {Box, LinearProgress, Typography} from '@material-ui/core'
const LinearProgressBar = (props) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

export default LinearProgressBar