# -*- coding: utf-8 -*-

# class SoftwareJi(http.Controller):
#     @http.route('/software_ji/software_ji/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/software_ji/software_ji/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('software_ji.listing', {
#             'root': '/software_ji/software_ji',
#             'objects': http.request.env['software_ji.software_ji'].search([]),
#         })

#     @http.route('/software_ji/software_ji/objects/<model("software_ji.software_ji"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('software_ji.object', {
#             'object': obj
#         })

from odoo import http
from odoo.http import request


class SoftwareJi(http.Controller):

    @http.route('/api/contratador/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        contratador_rec = request.env['software_ji.contratador'].sudo().search([])
        contratador = []
        for rec in contratador_rec:
            vals = {
                'id': rec.id,
                'empresa': rec.empresa,
                'description': rec.description
            }
            contratador.append(vals)
        return {'status': 200, 'response': contratador, 'message': 'Success'}

    @http.route('/api/contratador/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['software_ji.contratador']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'empresa': rec.empresa,
            'description': rec.description
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/contratador/findByBrand', type="json", auth="public", csrf=True, cors='*')
    def findByEmpresa(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['empresa'] + '%'
        contratador_rec = request.env['software_ji.contratador'].sudo().search([('empresa', '=ilike', reg_exp)])
        contratador = []
        for rec in contratador_rec:
            vals = {
                'id': rec.id,
                'empresa': rec.empresa,
                'description': rec.description
            }
            contratador.append(vals)
        return {'status': 200, 'response': contratador, 'message': 'Success'}

    @http.route('/api/contratador/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["software_ji.contratador"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/contratador/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["software_ji.contratador"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/contratador/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["software_ji.contratador"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/contratador/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["software_ji.contratador"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_contratador = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_contratador.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data