
export default {
    name: "Project",
    title: "Project",
    type: "document",
    fields: [ 
        {
            name: "title",
            type: "string",
        },
        {
            name: "slug",
            type: "string"
        },
        {
            name: "image",
            type: "image",
        },
        {
            name: "bannerimage",
            type: "image",
        },
        {
            name: "description",
            type: "text",
        },
        {
            name: "projectDescription",
            type: "text",
        },
        {
            name: "techDescription",
            type: "text",
        },
        {
            name: "builtWith",
            type: "string"
        },
    
        {
            name: "projectType",
            title: "Project Type",
            type: "string",
            options: {
                list: [
                    {value: "personal", title: "Personal"},
                    {value: "personal", title: "Client"},
                    {value: "personal", title: "School"},
                ]
            },
        },
        {
            name: "link",
            type: "url",
        },
        {
            title: 'Show on Homepage?',
            name: 'homepage',
            type: 'boolean'
        },
        {
            name: "tags",
            type: "array",
            of: [
                {
                    type: "string"
                }
            ],
            options: [
                {
                    layout: "tags",
                },
            ],
        }
    ]
}