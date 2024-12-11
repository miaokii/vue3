import { t } from "@/i18n"
import { computed, reactive } from "vue"

export enum ServiceType {
    // Business Incorporation
    incorporation = 'incorporation',
    // Corporate Secretarial Services 
    secretarial = 'secretarial',
    // Accounting & Taxation
    taxation = 'taxation',
    // Business Advisory
    advisory = 'advisory',
    // Employment Agency Work
    agency = 'agency',
    // Business Incubator
    incubator = 'incubator',
}

// 所有的服务类型
export let service_types = [
    ServiceType.incorporation,
    ServiceType.secretarial,
    ServiceType.taxation,
    ServiceType.advisory,
    ServiceType.agency,
    ServiceType.incubator
]

// 服务详情map
export let service_map = computed( ()=> {
    return { 
        incorporation: {
            type: ServiceType.incorporation,
            image: 'serverse01.png',
            title: t('services.incorporation'),
            content: t('services.incorporation_content'),
            detailImage: 'sd1.png',
            description: t('services.incorporation_des'),
            stepTitle: t('services.incorporation_des_title'),
            steps: t('services.incorporation_steps')
        },
        secretarial:{
            type: ServiceType.secretarial,
            image: 'serverse02.png',
            title: t('services.secretarial'),
            content: t('services.secretarial_content'),
            detailImage: 'sd2.png',
            description: t('services.secretarial_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.secretarial_steps')
        },
        taxation: {
            type: ServiceType.taxation,
            image: 'serverse03.png',
            title: t('services.taxation'),
            content: t('services.taxation_content'),
            detailImage: 'sd3.png',
            description: t('services.taxation_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.taxation_steps'),
        },
        advisory: {
            type: ServiceType.advisory,
            image: 'serverse04.png',
            title: t('services.advisory'),
            content: t('services.advisory_content'),
            detailImage: 'serverse04.png',
            description: t('services.advisory_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.advisory_steps'),
        },
        agency: {
            type: ServiceType.agency,
            image: 'serverse05.png',
            title: t('services.agency'),
            content: t('services.agency_content'),
            detailImage: 'serverse05.png',
            description: t('services.agency_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.agency_steps'),
        },
        incubator: {
            type: ServiceType.incubator,
            image: 'serverse06.png',
            title: t('services.incubator'),
            content: t('services.incubator_content'),
            detailImage: 'sd6.png',
            description: t('services.incubator_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.incubator_steps'),
        },
    }
})

/*
// 服务模型
export interface ServiceModel {
    type: ServiceType,
    image: string,
    title: string,
    content: string,

    description: string,
    stepTitle: string,
    steps: string,

    detailImage: string,
}
export let service_list = computed( ()=> {
    return [
        {
            type: ServiceType.incorporation,
            image: 'serverse01.png',
            title: t('services.incorporation'),
            content: t('services.incorporation_content'),
            detailImage: 'sd1',
            description: t('services.incorporation_des'),
            stepTitle: t('services.incorporation_des_title'),
            steps: t('services.incorporation_steps')
        },
        {
            type: ServiceType.secretarial,
            image: 'serverse02.png',
            title: t('services.secretarial'),
            content: t('services.secretarial_content'),
            detailImage: 'sd2',
            description: t('services.secretarial_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.secretarial_steps')
        },
        {
            type: ServiceType.taxation,
            image: 'serverse03.png',
            title: t('services.taxation'),
            content: t('services.taxation_content'),
            detailImage: 'sd3',
            description: t('services.taxation_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.taxation_content'),
        },
        {
            type: ServiceType.advisory,
            image: 'serverse04.png',
            title: t('services.advisory'),
            content: t('services.advisory_content'),
            detailImage: 'serverse04.png',
            description: t('services.advisory_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.advisory_steps'),
        },
        {
            type: ServiceType.agency,
            image: 'serverse05.png',
            title: t('services.agency'),
            content: t('services.agency_content'),
            detailImage: 'serverse05.png',
            description: t('services.agency_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.agency_steps'),
        },
        {
            type: ServiceType.incubator,
            image: 'serverse06.png',
            title: t('services.incubator'),
            content: t('services.incubator_content'),
            detailImage: 'sd6',
            description: t('services.incubator_des'),
            stepTitle: t('services.service_step_title'),
            steps: t('services.incubator_steps'),
        },
    ]
})
    */