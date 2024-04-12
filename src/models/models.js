// Importar Sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import bcrypt from "bcryptjs";

// Definir el modelo User
export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ldap: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export const LoginAudit = sequelize.define('LoginAudit', {
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    success: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const AccessAudit = sequelize.define('AccessAudit', {
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    success: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir el modelo Role
export const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definir el modelo Dependency
export const MainDependency = sequelize.define('MainDependency', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export const Dependency = sequelize.define('Dependency', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definir el modelo AccessRequest
export const AccessRequest = sequelize.define('AccessRequest', {
    justification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreJefe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargoJefe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pdfBlob: {
        type: DataTypes.BLOB,
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir el modelo ImplementationRequest
export const ImplementationRequest = sequelize.define('ImplementationRequest', {
    justification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pdfBlob: {
        type: DataTypes.BLOB,
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
});

// Definir el modelo Group
export const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definir el modelo Module
export const Module = sequelize.define('Module', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definir el modelo Report
export const Report = sequelize.define('Report', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    confidential: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});


// Sequelize hooks for password encryption
User.beforeCreate(async (user) => {
    if (user.changed('password') && user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.beforeUpdate(async (user) => {
    if (user.changed('password') && user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Sequelize method to compare passwords
User.prototype.comparePassword = async function (password) {
    this.ldap = false; // El usuario se autentica por contraseña
    return await bcrypt.compare(password, this.password);
};

// Nueva función para autenticación LDAP
User.prototype.authenticateLDAP = function () {
    this.ldap = true; // El usuario se autentica por LDAP
};

// Definir las relaciones
AccessRequest.belongsTo(User);
User.hasMany(AccessRequest);

ImplementationRequest.belongsTo(User);
User.hasMany(ImplementationRequest);

User.belongsTo(Role);
Role.hasMany(User);

Dependency.belongsTo(MainDependency);
MainDependency.hasMany(Dependency);

User.belongsTo(Dependency);
Dependency.hasMany(User);

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

User.belongsToMany(Module, { through: 'UserModule' });
Module.belongsToMany(User, { through: 'UserModule' });

User.belongsToMany(Report, { through: 'UserReport' });
Report.belongsToMany(User, { through: 'UserReport' });

AccessRequest.belongsToMany(Report, { through: 'AccessRequestReport' });
Report.belongsToMany(AccessRequest, { through: 'AccessRequestReport' });

Module.belongsTo(Group);
Group.hasMany(Module);

Report.belongsTo(Module);
Module.hasMany(Report);

LoginAudit.belongsTo(User);
User.hasMany(LoginAudit);

AccessAudit.belongsTo(User);
User.hasMany(AccessAudit);

AccessAudit.belongsTo(Report);
Report.hasOne(AccessAudit);