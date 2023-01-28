# -*- coding: utf-8 -*-
{
    'name': "Contratador",

    'summary': """
        Módulo de empresas contratadoras""",

    'description': """
        Registra empresas contratadoras. Las empresas, a su vez, asignan proyectos a sus empleados.
    """,

    'author': "Iván",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','project'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'data/project_task_data.xml',
        'data/project_task_data_2.xml',
        'reports/contratador_report.xml',
        'reports/contratador_report_view.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'application':'True',
}
