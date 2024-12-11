import { t } from "@/i18n"

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

// 服务模型
export interface ServiceModel {
    type: ServiceType,
    image: string,
    title: string,
    content: string,

    description: string,
    stepTitle: string,
    steps: string[]

    detailImage: string,
}

export let services: ServiceModel[] = [
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
        description: '',
        stepTitle: '',
        steps: []
    },
    {
        type: ServiceType.advisory,
        image: 'serverse04.png',
        title: t('services.advisory'),
        content: t('services.advisory_content'),
        detailImage: 'serverse04.png',
        description: '',
        stepTitle: '',
        steps: []
    },
    {
        type: ServiceType.agency,
        image: 'serverse05.png',
        title: t('services.agency'),
        content: t('services.agency_content'),
        detailImage: 'serverse05.png',
        description: '',
        stepTitle: '',
        steps: []
    },
    {
        type: ServiceType.incubator,
        image: 'serverse06.png',
        title: t('services.incubator'),
        content: t('services.incubator_content'),
        detailImage: 'sd6',
        description: '',
        stepTitle: '',
        steps: []
    },
]
