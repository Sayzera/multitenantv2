
import type { AccessArgs, CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: 'categories',
    // access: {
    //     create: (par: AccessArgs) => {
    //         return false
    //     },
    //     update: () => false
    // },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type:'text',
            required: true,
            unique: true,
            index:true
        },
        {
            name:'color',
            type: 'text',
            admin: {
                components: {
                    Field: {
                        path: '@/components/payload/fields/color-picker#ColorPicker'
                    }
                }
            }
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
        },
        {
            name: 'subcategories',
            type: 'join',
            collection: 'categories',
            on: 'parent',
            hasMany: true
        }
    ]
}