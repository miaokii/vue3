
// 所有的服务类型
export const service_types = [
    'incorporation',
    'secretarial',
    'taxation',
    'advisory',
    'agency',
    'incubator'
]

// 服务模型
export interface ServiceModel {
    image: string
    title: string
    content: string

    description: string
    stepTitle: string
    steps: string

    detailImage: string
}

// 服务详情map
export const service_map = computed<{ [key: string]: ServiceModel }>(() => {
    return {
        incorporation: {
            image: 'serverse01.png',
            title: $t('services.incorporation'),
            content: $t('services.incorporation_content'),
            detailImage: 'serverse01.png',
            description: $t('services.incorporation_des'),
            stepTitle: $t('services.incorporation_des_title'),
            steps: $t('services.incorporation_steps')
        },
        secretarial: {
            image: 'serverse02.png',
            title: $t('services.secretarial'),
            content: $t('services.secretarial_content'),
            detailImage: 'sd2.png',
            description: $t('services.secretarial_des'),
            stepTitle: $t('services.service_step_title'),
            steps: $t('services.secretarial_steps')
        },
        taxation: {
            image: 'serverse03.png',
            title: $t('services.taxation'),
            content: $t('services.taxation_content'),
            detailImage: 'sd3.png',
            description: $t('services.taxation_des'),
            stepTitle: $t('services.service_step_title'),
            steps: $t('services.taxation_steps'),
        },
        advisory: {
            image: 'serverse04.png',
            title: $t('services.advisory'),
            content: $t('services.advisory_content'),
            detailImage: 'serverse04.png',
            description: $t('services.advisory_des'),
            stepTitle: $t('services.service_step_title'),
            steps: $t('services.advisory_steps'),
        },
        agency: {
            image: 'serverse05.png',
            title: $t('services.agency'),
            content: $t('services.agency_content'),
            detailImage: 'serverse05.png',
            description: $t('services.agency_des'),
            stepTitle: $t('services.service_step_title'),
            steps: $t('services.agency_steps'),
        },
        incubator: {
            image: 'serverse06.png',
            title: $t('services.incubator'),
            content: $t('services.incubator_content'),
            detailImage: 'sd6.png',
            description: $t('services.incubator_des'),
            stepTitle: $t('services.service_step_title'),
            steps: $t('services.incubator_steps'),
        },
    }
})
