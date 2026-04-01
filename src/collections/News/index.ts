import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { GallerySliderBlock } from '../../blocks/GallerySliderBlock/config'
import { RelatedNewsBlock } from '../../blocks/RelatedNews/config'
import { RichTextSectionBlock } from '../../blocks/RichTextSection/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateNews } from './hooks/revalidateNews'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const News: CollectionConfig<'news'> = {
  slug: 'news',
  labels: {
    singular: {
      en: 'News',
      ru: 'Новость',
    },
    plural: {
      en: 'News',
      ru: 'Новости',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'news'>
  defaultPopulate: {
    title: true,
    slug: true,
    tags: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'news',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'news',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
      localized: true,
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: {
        en: 'Excerpt',
        ru: 'Краткое описание',
      },
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Hero Image',
                ru: 'Главное изображение',
              },
            },
            {
              name: 'contentSections',
              type: 'blocks',
              blocks: [RichTextSectionBlock, MediaBlock, GallerySliderBlock, Banner, Code, RelatedNewsBlock],
              localized: true,
              label: {
                en: 'Content Sections',
                ru: 'Разделы контента',
              },
            },
          ],
          label: {
            en: 'Content',
            ru: 'Контент',
          },
        },
        {
          fields: [
            {
              name: 'relatedNews',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'news',
              label: {
                en: 'Related News',
                ru: 'Похожие новости',
              },
            },
          ],
          label: {
            en: 'Meta',
            ru: 'Мета',
          },
        },
        {
          name: 'meta',
          label: {
            en: 'SEO',
            ru: 'SEO',
          },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: {
        en: 'Published At',
        ru: 'Дата публикации',
      },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      label: {
        en: 'Tags',
        ru: 'Теги',
      },
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'news-tags',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateNews],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
