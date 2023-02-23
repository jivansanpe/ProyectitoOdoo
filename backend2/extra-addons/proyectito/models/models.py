# -*- coding: utf-8 -*-

from odoo import models, fields, api

class ProjectKanban(models.Model):
    _inherit = 'project.project'

    @api.model
    def create(self, vals):
        project = super(ProjectKanban, self).create(vals)

        # Crear estados del Kanban
        self.env['project.task.type'].create({
            'name': 'Sin iniciar',
            'project_ids': [(4, project.id)],
            'sequence': 10,
            'description': 'Tareas que aún no han comenzado'
        })
        self.env['project.task.type'].create({
            'name': 'En progreso',
            'project_ids': [(4, project.id)],
            'sequence': 20,
            'description': 'Tareas en progreso'
        })
        self.env['project.task.type'].create({
            'name': 'Bloqueado',
            'project_ids': [(4, project.id)],
            'sequence': 30,
            'description': 'Tareas que están bloqueadas por algún motivo'
        })
        self.env['project.task.type'].create({
            'name': 'Terminado',
            'project_ids': [(4, project.id)],
            'sequence': 40,
            'description': 'Tareas que se han completado'
        })
        self.env['project.task.type'].create({
            'name': 'Revisado',
            'project_ids': [(4, project.id)],
            'sequence': 50,
            'description': 'Tareas que han sido revisadas'
        })

        # Crear tareas en estado "Sin iniciar"
        tasks = [
            {
                'name': 'Análisis',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
            {
                'name': 'Diagrama E/R',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
            {
                'name': 'Casos de uso',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
            {
                'name': 'Mockups',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
            {
                'name': 'Despliegue',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
            {
                'name': 'Manual de usuario',
                'project_id': project.id,
                'stage_id': project.type_ids.filtered(lambda x: x.name == 'Sin iniciar').id
            },
        ]

        self.env['project.task'].create(tasks)

        return project

class CustomProjectTaskType(models.Model):
    _inherit = 'project.task'

    kanban_state = fields.Selection([
        ('normal', 'En progreso'),
        ('done', 'Preparado'),
        ('blocked', 'Bloqueada'),
        ('sin_asignar', 'Sin asignar'),
        ('atrasada','Atrasada')
    ], 
    string='Kanban State', 
    default='normal',
    required=True,
    tracking=True)

    kanban_state_label = fields.Char(string='Etiqueta del estado del kanban', compute='_compute_kanban_state_label')
    
    @api.depends('kanban_state')
    def _compute_kanban_state_label(self):
        for task in self:
            if task.kanban_state == 'normal':
                task.kanban_state_label = 'En progreso'
            elif task.kanban_state == 'done':
                task.kanban_state_label = 'Preparado'
            elif task.kanban_state == 'blocked':
                task.kanban_state_label = 'Bloqueada'
            elif task.kanban_state == 'sin_asignar':
                task.kanban_state_label = 'Sin asignar'
            elif task.kanban_state == 'atrasada':
                task.kanban_state_label = 'Atrasada'










# class proyectito(models.Model):
#     _name = 'proyectito.proyectito'
#     _description = 'proyectito.proyectito'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
