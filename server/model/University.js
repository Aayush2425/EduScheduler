
const mongoose = require('mongoose');

const universitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        admin: {
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            universityEmail: {
                type: String,
                required: true
            },
            personalUniEmail: {
                type: String,
                required: true
            }
        },
        generalDetails: {
            time: {
                break: [
                    {
                        start: {
                            type: Date,
                            required: true
                        },
                        end: {
                            type: Date,
                            required: true
                        },
                    }
                ],
                slots: [
                    {
                        start: {
                            type: Date,
                            required: true
                        },
                        end: {
                            type: Date,
                            required: true
                        },
                    }
                ],
                resources: [        // lab time - lec time - audi time
                    {
                        start: {
                            type: Date,
                            required: true
                        },
                        end: {
                            type: Date,
                            required: true
                        },
                    }
                ]
            },
            days: {
                type: Number,
                required: true
            },
            depts: [
                {
                    deptName: {
                        type: String,
                        required: true
                    },
                    semester: {
                        type: Number,
                        required: true
                    },
                    batches: [String]
                }
            ],
            numberOfResources: [                //  how much audi , lab , lecture
                {
                    type: {
                        type: String,
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                }
            ]
        },
        facultyDetails: [
            {
                factName: {
                    type : String,
                    required : true
                },
                dept: [
                    {
                        deptName: {
                            type : String,
                            required : true
                        }
                    }
                ],
                subjects: [
                    {
                        subjectName: {
                            type : String,
                            required : true
                        },
                    }
                ],
                availability: [
                    {
                        day: {
                            type : String,
                            required : true
                        },
                        slots: [Number],
                    }
                ],
                teachingType: [
                    {
                        typeName: {
                            type : String,
                            required : true
                        }
                    }
                ]
            }
        ],

        resources: [
            {
                type: {
                    type : String,
                    required : true
                },
                name: {
                    type : String,
                    required : true
                },
                availability: [
                    {
                        day: String,
                        slots: [Number],
                    }
                ],
            }
        ],

        timetables: [
            {
                deptName: {
                    type: String,
                    required: true
                },
                sem: {
                    type : String,
                    required : true
                },
                day: [{
                    dayName: {
                        type : String,
                        required : true
                    },
                    slot: [
                        {
                            slotNumber: {
                                type : Number,
                                required : true
                            },
                            resource: {
                                type : String,
                                required : true
                            },
                            faculty: {
                                type : String,
                                required : true
                            },
                            otherDetails: {
                                type : String,
                                required : true
                            },
                            batch: [String]
                        }
                    ],
                }],
            }
        ]
    }
)

const University = mongoose.model("University", universitySchema);
module.exports = University;

/*
    UNIVERSITY 
        NAME
        ADMIN DETAILS
            USERNAME
            PASSWORD
            UNIVERSITY EMAIL
            PERSONAL UNI EMAIL
 
        GENERAL DETAILS
            TIME : {BREAK : {}, SLOTS : {}, RESOURCES : [{TYPE : TIME}]}
            DAYS
            DEPT : [ { NAME, SEM, BATCH : [ { BATCHES } ] } ]
            NUMBER_OF_RESOURCES : [{}]

        
        FAC DETAILS
              NAME
              DEPT : []
              SUBJECT : []
              AVALIBILITY : [{ DAY : [] }]
              TEACHINGTYPE : []  

        RESOURCE DETAILS : [{}]
                TYPE
                NAME : AUDI 1
                AVALIBILITY : [{ DAYNAME : [] }]

        TIMETABLES
                DEPT
                SEM
                DAY : [DAYNAME : {SLOT-1 : [{RESOURCENAME, FACNAME, OTHER DETAILS}]}]
*/