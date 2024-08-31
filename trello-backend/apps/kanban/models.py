from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

User = get_user_model()

class Usuario(AbstractUser):
    sso_id = models.CharField(max_length=255, null=True, blank=True, unique=True)

    def __str__(self):
        return self.username

class EspacioTrabajo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    abreviatura = models.CharField(max_length=20)
    sitio_web = models.URLField()
    estado = models.BooleanField(default=True)
    propietario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    miembros = models.ManyToManyField(Usuario, related_name='espacios_trabajo')

    def __str__(self):
        return self.nombre
    

class Tablero(models.Model):
    nombre = models.CharField(max_length=100)
    espacio_trabajo = models.ForeignKey(EspacioTrabajo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    

class Lista(models.Model):
    nombre = models.CharField(max_length=100)
    limite_tarjetas = models.PositiveSmallIntegerField(null=True)
    tablero = models.ForeignKey(Tablero, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50)
    

class Tarjeta(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True)
    estado = models.BooleanField(default=True)
    ultimo_detalle = models.CharField(max_length=250)
    lista = models.ForeignKey(Lista, on_delete=models.CASCADE)
    responsable = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    etiqueta = models.ForeignKey(Etiqueta, on_delete=models.SET_NULL, null=True)


class Tarea(models.Model):
    descripcion = models.CharField(max_length=540)
    estado = models.BooleanField(default=True)
    fecha_vencimiento = models.DateTimeField(null=True)
    tarjeta = models.ForeignKey(Tarjeta, on_delete=models.CASCADE)


