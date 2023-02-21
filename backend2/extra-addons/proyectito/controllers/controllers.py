from odoo import http
from odoo.http import request


class Proyectito(http.Controller):

    @http.route('/api/proyectito/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        proyectito_rec = request.env['project.task'].sudo().search([])
        proyectito = []
        for rec in proyectito_rec:
            vals = {
                'id': rec.id,
                'name':rec.name,
                'proyecto': rec.project_id.name,
                'user': rec.user_id.name,
                'fase':rec.stage_id.name,
                'estado':rec.kanban_state_label
            }
            proyectito.append(vals)
        return {'status': 200, 'response': proyectito, 'message': 'Success'}
 
    @http.route('/api/proyectito/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['project.task']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
                'id': rec.id,
                'name':rec.name,
                'proyecto': rec.project_id.name,
                'user': rec.user_id.name,
                'fase':rec.stage_id.name,
                'estado':rec.kanban_state_label
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/proyectito/findByProyectito', type="json", auth="public", csrf=True, cors='*')
    def findByProyectito(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        proyectito_rec = request.env['project.task'].sudo().search([('name', '=ilike', reg_exp)])
        proyectito = []
        for rec in proyectito_rec:
            vals = {
                'id': rec.id,
                'name':rec.name,
                'proyecto': rec.project_id.name,
                'user': rec.user_id.name,
                'fase':rec.stage_id.name,
                'estado':rec.kanban_state_label
            }
            proyectito.append(vals)
        return {'status': 200, 'response': proyectito, 'message': 'Success'}

    @http.route('/api/proyectito/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["project.task"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/proyectito/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["project.task"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/proyectito/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["project.task"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/proyectito/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["project.task"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_proyectito = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_proyectito.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data