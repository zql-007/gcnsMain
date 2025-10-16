// import { ccDownloadTemplateExcelBank } from '@/lib/EquipmentLedger'
export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    /*if (config.url == ccDownloadTemplateExcelBank) {
      config['responseType'] = 'blob'
    }*/
    if (config.url.indexOf('/test/equipMentAnalysisTemplate') !== -1) {
      config['responseType'] = 'blob'
    }

    if (config.url.indexOf('/picapi/') !== -1) {
      config['responseType'] = 'blob'
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
