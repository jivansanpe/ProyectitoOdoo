# -*- coding: utf-8 -*-

from odoo import models, fields, api


class software_ji_contratador(models.Model):
    _name = 'software_ji.contratador'
    _description = 'software_ji.contratador'

    name = fields.Integer(string="Número de contrato")
    empresa = fields.Char(string='Empresa')
    description = fields.Text(string='Descripción')
    horas = fields.Integer(string="Número de horas")
    pago_por_hora = fields.Integer(string="Pago por hora")
    pago_total = fields.Integer(string="Pago total", compute="_pagototal", store=True)
    proyectos = fields.One2many("project.project","empresas", string="Proyectos")

    @api.depends('horas','pago_por_hora')
    def _pagototal(self):
        for r in self:
            if r.horas > 0:
                r.pago_total = r.horas * r.pago_por_hora

class software_ji_empresas(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    empresas = fields.Many2one("software_ji.contratador", string="Empresa", ondelete="cascade")