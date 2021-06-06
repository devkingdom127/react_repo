import moment from "moment"

export const getExtraOptions = ({classifications, timeLimit, clickLimit, goRogue}) => {
    /*  takes in current redux slice and computes extra options to be sent
            time_limit
            click_limit
            go_rougue
            not_child
            not_work
            contains_politics
            contains_promotions
            contains_violence
    */
    return {
        ...(classifications.saved.includes("not_child") && { not_child: 1 }),
        ...(classifications.saved.includes("not_work") && { not_work: 1 }),
        ...(classifications.saved.includes("contains_politics") && { contains_politics: 1 }),
        ...(classifications.saved.includes("contains_promotions") && { contains_promotions: 1 }),
        ...(classifications.saved.includes("contains_violence") && { contains_violence: 1 }),
        ...(timeLimit.saved.total > 0 && { time_limit: moment.utc().add(timeLimit.saved.total,"seconds").format()}),
        ...(clickLimit?.saved > 0 && { click_limit: Number(clickLimit.saved)  }),
        ...(goRogue === true && { go_rougue: 1 }),
    }
};
