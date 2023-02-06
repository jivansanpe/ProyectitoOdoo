# -*- coding: utf-8 -*-
# from odoo import http


# class Proyectito(http.Controller):
#     @http.route('/proyectito/proyectito/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/proyectito/proyectito/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('proyectito.listing', {
#             'root': '/proyectito/proyectito',
#             'objects': http.request.env['proyectito.proyectito'].search([]),
#         })

#     @http.route('/proyectito/proyectito/objects/<model("proyectito.proyectito"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('proyectito.object', {
#             'object': obj
#         })
