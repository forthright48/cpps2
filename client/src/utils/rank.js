export function getRankName(rating) {
    if (rating > 0 && rating < 1200) {
        return 'rank-ash'
    } else if (rating < 1400) {
        return 'rank-green'
    } else if (rating < 1600) {
        return 'rank-teal'
    } else if (rating < 1900) {
        return 'rank-blue'
    } else if (rating < 2100) {
        return 'rank-purple'
    } else if (rating < 2300) {
        return 'rank-orange'
    } else if (rating < 100000000) {
        return 'rank-red'
    } else {
        return ''
    }
}
