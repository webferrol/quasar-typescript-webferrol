//Composables
import { useMeta } from 'quasar';

interface Meta {   
    title: string,   
    descriptionContent?: string,    
    keywordsContent?: (string[]|string)
}

/**
 * Configuración de las etiquetas Meta para el SEO
 *
 * @param { Object } meta - Configuración de las etiquetas meta
 * @param { string } meta.title - Título de la etiqueta title 
 * @param { string } meta.descriptionContent - Contenido del atributo content de la etiqueta meta description
 * @param {(string | string[])} meta.keywordsContent - Contenido del atributo content de la etiqueta meta keywords
 */
export const useMetaLabels = ({title='Programador y diseñador web',descriptionContent='',keywordsContent=''}:Meta) => {
    if(Array.isArray(keywordsContent)){
        keywordsContent = keywordsContent.join();
    }
    const metaData: object = {
        // sets document title
        title,
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: (title: String) => `${title} - WebFerrol`,

        // meta tags
        meta: {
            description: { name: 'description', content: descriptionContent },
            keywords: { name: 'keywords', content: keywordsContent },
            equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        },
        // <noscript> tags
        noscript: {
            default: 'This is content for browsers with no JS (or disabled JS)'
        }
    }
    useMeta(metaData);
}