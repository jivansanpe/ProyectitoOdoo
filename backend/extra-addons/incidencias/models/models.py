# -*- coding: utf-8 -*-

from odoo import models, fields, api

class incidencias_incidencias(models.Model):
     _name = 'incidencias.incidencias'
   
     name = fields.Integer(string="Número incidencia")
     municipio = fields.Many2one("incidencias.municipios", string="Municipio", required=True, ondelete="cascade")
     fecha = fields.Date(string="Fecha")
     description = fields.Char(string="Usuario que atiende la incidencia.")
     cliente = fields.Many2one("res.partner", string="Cliente", required=True, ondelete="cascade")


class incidencias_municipios(models.Model):
     _name = 'incidencias.municipios'
     _description = 'incidencias.municipios'
     
     name = fields.Char(string="Nombre")
     habitantes = fields.Integer(string="Habitantes")
     imagen = fields.Binary(string="Mapa del municipio")
     superficie = fields.Integer(string="Superficie")
     densidad_poblacion = fields.Float(string="Densidad Población", compute="_densidadpoblacion", store=True)
     incidencias = fields.One2many("incidencias.incidencias", "municipio", string="Incidencias")

     @api.depends('habitantes', 'superficie')
     def _densidadpoblacion(self):
          for r in self:
               if r.superficie > 0:
                    r.densidad_poblacion = r.habitantes/r.superficie


class incidencias_clientes(models.Model):
     _name = 'res.partner'
     _inherit = 'res.partner'

     incidencias = fields.One2many("incidencias.incidencias", "cliente", string="Incidencias")
